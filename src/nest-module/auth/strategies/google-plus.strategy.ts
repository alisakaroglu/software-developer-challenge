import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback} from 'passport-google-oauth20';
import { Injectable } from '@nestjs/common';

export class GoogleStrategy extends PassportStrategy(Strategy, 'google'){
    constructor(){
        super({
            clientID: '701520691505-7av5hv5uhvpukm27v93nbeghptotae67.apps.googleusercontent.com',
            clientSecret: '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',
            callbackURL: 'https://challenge.alisakaroglu.com/auth/google/callback',
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
