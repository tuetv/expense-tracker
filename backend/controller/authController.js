const jwt = require('jsonwebtoken');
const User = require('../models/User');


// generate jwt token
const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {expiresIn: '30d'});
};

//Response user
exports.registerUser = async (req, res) => {
    const {fullName, email, password, profileImageUrl} = req.body;

    if(!fullName || !email || !password) {
        return res.status(400).json({message: 'Vui lòng nhập đầy đủ thông tin'});
    }

    try {
        // check if email already exists
        const existsUser = await User.findOne({email});
        if(existsUser) {
            return res.status(400).json({message: 'Email đã tồn tại'});
        }

        // Create the user
        const user = await User.create({
            fullName,
            email,
            password,
            profileImageUrl,
        });

        res.status(201).json({
            id: user._id,
            user, 
            token: generateToken(user._id),
        });
    } catch (err) {
        res
        .status(500)
        .json({message: 'Đăng ký user lỗi', error: err.message});
    }
};


// Login user
exports.loginUser = async (req, res) => {
    const {email, password} = req.body;
    if(!email || !password) {
        return res.status(400).json({message: 'Vui lòng nhập đầy đủ thông tin'});
    }

    try {
        const user = await User.findOne({email});
        if(!user || !(await user.comparePassword(password))) {
            return res.status(400).json({message: 'Email hoặc mật khẩu không chính xác'});
        }

        res.status(200).json({
            id: user._id,
            user,
            token: generateToken(user._id),
        });
    } catch (err) {
        res
        .status(500)
        .json({message: 'Đăng nhập lỗi', error: err.message});
        
    }
};


// Get user info
exports.getUserInfo = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        if(!user)
        {
            return res.status(404).json({message: 'Không tìm thấy user'});
        }

        res.status(200).json(user);

    } catch (err) {
        res
        .status(500)
        .json({message: 'Lỗi lấy thông tin user', error: err.message});
    }
};
