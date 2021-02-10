export default class GitService {
    private _apiBase = 'https://api.github.com';
    // https://api.github.com/search/users?q=${Login}&page=1&per_page=100
    // 74a6100b67164129694d97342d9f9d4cc53e18cc

    async getResource(url: string) {
        const headers = {
            'Authorization' : 'Token 4be4a1ec9b0542251701c33fd8e3ee72d0be2fc4'
        }

        const res = await fetch(`${this._apiBase}${url}`, {
            method: 'GET',
            headers: headers,
        });

        if (!res.ok) {
            throw new Error (`Could not fetch ${url}, status: ${res.status}`);
        }

        return await res.json();
    };

    async getUserRepoCount(login: string) {
        const res = await this.getResource(`/users/${login}`);

        return res.public_repos;
    }

    async searchUsers(search?: string) {
        const res = await this.getResource(`/search/users?q=${search}&page=1&per_page=50`);
        return res.items.map((user: any) => ({
            id: user.id,
            login: user.login,
            avatar_url: user.avatar_url,
        }));
    };

    async getUserData(login: string) {
        const res = await this.getResource(`/users/${login}`);

        return {
            id: res.id,
            login: res.login,
            userName: res.name,
            avatar_url: res.avatar_url,
            email: res.email,
            location: res.location,
            join_date: res.created_at.substring(0,10),
            followers: res.followers,
            following: res.following,
            bio: res.bio,
        };
    }
    
    async searchRepos(login: string, search?: string) {
        const res = await this.getResource(`/search/repositories?q=${search} user:${login}`);
        return res.items.map((repo: any) => ({
            id: repo.id,
            name: repo.name,
            forks: repo.forks,
            stars: repo.stargazers_count,
            url: repo.html_url,
        }));
    };

}

export const service = new GitService();
