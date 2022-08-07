export default class Note {
    id;
    title;
    desc;
    _date;

    constructor(id, title, desc, _date) {
        this.id = id;
        this.title = title;
        this.desc = desc;
        this._date = _date;
    }
}