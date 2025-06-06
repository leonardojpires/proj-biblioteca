const Leitor = require("../database/models/leitor");

module.exports = {
    async getAll(req, res) {
        try {
            const leitores = await Leitor.all();
            res.json(leitores);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },
}