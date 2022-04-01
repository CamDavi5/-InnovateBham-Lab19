import { Query } from './index';

const all = async () => Query('select c.id as id, u.name as username, c.userid as userid, c.content as content, c.location as location, c._created as posttime from chirps c join users u on u.id = c.userid');
const one = async (id) => Query('SELECT * FROM chirps WHERE id = ?', [id]);
const remove = async (id) => Query('DELETE FROM chirps WHERE id = ?', [id]);
const post = async (userid, content, location) => Query(`INSERT INTO chirps (id, userid, content, location) values(null, ${userid}, '${content}', '${location}')`);
const update = async (id, userid, content, location) => Query(`UPDATE chirps SET userid = ${userid}, content = '${content}', location = '${location}', _created = CURRENT_TIMESTAMP WHERE id = ${id}`);

export default {
    all,
    one,
    remove,
    post,
    update
}