import { Injectable, Req } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import caver from 'caver-js';
import { Request } from 'express';

const MESSAGE = 'test';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ) {}
    
    async validateUser(address:string, sign:any) {
        const prefix = Buffer.from("\x19Klaytn Signed Message:\n");
        const hashedMessage = caver.utils.sha3(Buffer.concat([prefix, Buffer.from(String(MESSAGE.length)), Buffer.from(MESSAGE)]));
        const decodedSign = caver.utils.decodeSignature(sign);
        const recovered = caver.utils.recover(hashedMessage, decodedSign, true);
        
        //find user with address here
        const user = recovered===address? await this.usersService.findOne(recovered): null;
        return user;
    }
    
    login(user: any): string {
        const payload = {role:user.role, address:user.address}
        return this.jwtService.sign(payload, {
            expiresIn:'1h',
            algorithm:'ES256'
        });
    }
}