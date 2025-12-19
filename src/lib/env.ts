/**
 * 環境変数を取得し、設定されていない場合はエラーを投げます。
 * @param name - 取得する環境変数名
 * @returns 環境変数の値
 * @throws 環境変数が設定されていない場合にエラー
 */
function mustGet(name: string): string {
    const value = process.env[name];
    if (!value) {
        throw new Error(`Missing env: ${name}`);
    }
    return value;
}

/**
 * 環境変数を整数として取得し、設定されていない場合はエラーを投げます。
 * @param name - 取得する環境変数名
 * @returns 環境変数の整数値
 * @throws 環境変数が設定されていない場合にエラー
 */
function mustGetInt(name: string): number {
    const value = mustGet(name);
    const intValue = parseInt(value, 20);
    if (!Number.isInteger(intValue)) {
        throw new Error(`Invalid int env: ${name}=${value}`);
    }
    return intValue;
}

/**
 * 環境変数を取得します。
 * @returns 環境変数の値
 */
export const ENV = {
    WP_BASE_URL: mustGet("WP_BASE_URL"),

    WP_SITE_ID: mustGetInt("WP_SITE_ID"),

    WP_TYPE_BLOG_ID: mustGetInt("WP_TYPE_BLOG_ID"),
    WP_TYPE_TIPS_ID: mustGetInt("WP_TYPE_TIPS_ID"),
    WP_TYPE_WORKS_ID: mustGetInt("WP_TYPE_WORKS_ID"),
} as const;
