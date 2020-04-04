import Users from '../database/models/Users';
import errorHandler from '../../utils/errorHandler';
import { generateJWToken, compareHashPassword, generateHashPassword, generateUniqueImageNames} from '../services/UsersService';
import { uploadToS3 } from '../libs/aws';


export const index = async (req, res) => {
    try {
        const users = await Users.find({}).limit(15);
        res.send(users);
    } catch (e) {
        errorHandler(res, e);
    }
};

export const login = async (req, res) => {
    const candidate = await Users.findOne({email: req.body.email });

    if (candidate) {
        const passwordResult = compareHashPassword(req.body.password, candidate.password);
        if (passwordResult){
            const token = generateJWToken(candidate);

            res.status(200).json({
                token: `Bearer ${token}`,
                user: candidate
            });
        } else {
            errorHandler(res, {
                message: "Wrong password",
                status: 401
            });
        }
    } else {
        errorHandler(res, {
            message: "Email doesn't exist",
            status: 500
        });
    }
};

export const register = async (req, res) => {
    const candidate = await Users.findOne({email: req.body.email });

    if (candidate) {
        errorHandler(res, {
            message: "User already exists",
            status: 409
        });
    } else {
        try {
            const imageFile = req.files;
            const imageName = generateUniqueImageNames(imageFile.image.name);
            imageFile.image.name = imageName;

            uploadToS3(imageFile, async function (data) {
                const user = new Users({
                    email: req.body.email,
                    name: req.body.name,
                    image: 'https://aws-polly-hash-77542231.s3.us-east-2.amazonaws.com/' + imageName,
                    password: generateHashPassword(req.body.password)
                });

                const token = generateJWToken(user);
                await user.save();

                res.status(201).json({
                    user: user,
                    token: token
                });

            });
        } catch (e){
            errorHandler(res, e);
        }
    }
};

export const search = async (req, res) => {
    const searchValue = req.body.name;
    let users = [];

    if (searchValue) {
        users = await Users.find({name: {$regex: ".*" + searchValue + ".*"}});

        if (!users.length) {
            users = await Users.find({$text: {$search: searchValue}})
        }
    }

    res.status(200).json({
        users: users
    });
};
