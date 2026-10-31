/**
 * Host half of dsh-wechat-theme.
 *
 * The theme itself is pure CSS in the browser half (`./client`), so this entry
 * only has to register the Loader row. It stays dependency-free and cannot
 * throw, because a failed startup entry is fatal to the desktop shell.
 */
export const name = 'dsh-wechat-theme'

export function apply() {}

