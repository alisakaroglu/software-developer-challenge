import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback} from 'passport-google-oauth20';
import { Injectable } from '@nestjs/common';

export class GoogleStrategy extends PassportStrategy(Strategy, 'google'){
    constructor(){
        super({
            clientID: '701520691505-b638gle09keef5j99307umfa7834jonf.apps.googleusercontent.com',
            clientSecret: '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',
            callbackURL: 'http://localhost:3000/auth/google/callback',
            scope: ['email','profile']
        });
    }
    async validate(accessToken: string, refreshToken: string, profile: any, done: VerifyCallback): Promise<any>{
        const {name, emails, photos} = profile;
        const user = {
            email: emails[0].value,
            firstName: name.givenName,
            lastName: name.familyName,
            picture: photos[0].value,
            accessToken  
        };
        done(null,user)

    }
}
