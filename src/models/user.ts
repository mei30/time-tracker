import { Schema, Document, model } from 'mongoose';
import  * as bcrypt  from "bcrypt";

type comparePasswordFn = (candidatePassword: string, callback: (error: any, same: any) => void) => void;

export interface IUser {
    username: string
    password: string
};

export interface UserDocument extends IUser, Document {
    comparePassword: comparePasswordFn
};

const UserSchema = new Schema({
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true, unique: true}
}, {timestamps: true});

/**
 * Password hash middleware.
 */

UserSchema.pre('save', function save(next) {
    const user = this as UserDocument;

    if (!user.isModified('password')) {
        return next();
    }

    const rounds: number = 10;

    bcrypt.genSalt(rounds, (error: Error | undefined, salt: string) => {
        if (error) {
            return next(error);
        }

        bcrypt.hash(user.password, salt, (error: Error | undefined, encrypted: string) => {
            if (error) {
                return next(error);
            }

            user.password = encrypted;
            next();
        });
    });
});

const comparePassword: comparePasswordFn = function(this: UserDocument, candidatePassword, callback) {
    bcrypt.compare(candidatePassword, this.password, (error: Error | undefined, same: boolean) => {
        callback(error, same);
    });
};

UserSchema.methods.comparePassword = comparePassword;


export const User = model<UserDocument>('user', UserSchema);