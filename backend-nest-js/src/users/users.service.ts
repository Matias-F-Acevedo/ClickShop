import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { UserInterface } from './interface/user.interface';


@Injectable()
export class UsersService {

  constructor(@InjectRepository(User) private userRepository: Repository<User>){}


  async create(createUserDto: CreateUserDto): Promise<HttpException |UserInterface>{
    try {
      const userFound = await this.userRepository.findOne({where: {user_email: createUserDto.user_email}});

      if(userFound) throw new Error("This email is registered");

      const newUser =  this.userRepository.create(createUserDto);
      const newUserSave = await this.userRepository.save(newUser)

      const userWithoutPassword = {...newUserSave};
      delete (userWithoutPassword).user_password;

      return userWithoutPassword;

    
    } catch (error) {
      return new HttpException('User already exists', HttpStatus.CONFLICT);
    }
  }



  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
