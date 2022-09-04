const mongoose = require('mongoose')
const shortId = require('shortid')

const urlEncurtadaTabela = new mongoose.Schema({
    completa:{
        type: String,
        required: true
    },
    encurtada:{
        type: String,
        required: true,
        default: shortId.generate
    },
    clicks: {
        type: Number,
        required: true,
        default: 0
    }
})

module.exports = mongoose.model('UrlEncutada', urlEncurtadaTabela)