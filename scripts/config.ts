function getBaseUrl(defaultBaseUrl: string): string {
    const githubRepository = process.env.GITHUB_REPOSITORY;

    if (githubRepository === undefined) {
        return defaultBaseUrl;
    }

    const [, repo] = githubRepository.split("/");
    return `/${repo}`;
}

export const BUILD_CONFIG = {
    DIR: "src/pages",
    OUT_DIR: "dist",
    TYPEGEN_OUT_FILE: "src/generated/types.ts",
    BASE_URL: getBaseUrl("/"),
};
