const mongoose = require('mongoose');
const mongooseDelete = require('mongoose-delete');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
    },
    role: {
        type: String,
        enum: ['admin', 'merchant', 'usuario', 'anonimo'], //roles válidos
        default: 'usuario'
    },
    city: {
        type: String,
    },
    interests: String,
    date: { 
        type: Date,
    },
    offers: {
        type: Boolean,
    },
    isActive: {
        type: Boolean,
        default: true 
    }
}, {
    timestamps: true // añade createdAt y updatedAt automáticamente
});

// Agregar el plugin mongoose-delete al esquema
userSchema.plugin(mongooseDelete, { overrideMethods: 'all', deletedAt: true });

const User = mongoose.model('User', userSchema);

module.exports = User;
