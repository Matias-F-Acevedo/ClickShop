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



  async findAll(): Promise<UserInterface[]> {
    const users = await  this.userRepository.find();
    let result:UserInterface[] = [];

    if(users.length) {
      result =  users.map((u)=> {
        delete (u).user_password;
        return u;
      });
    }
    return result;
  }

  async findOne(id: number): Promise<HttpException |UserInterface> {

    const user = await this.userRepository.findOne({where: {user_id:id}});
    if(!user){
      return new HttpException('User does not exist', HttpStatus.NOT_FOUND);
    };

    const userWithoutPassword = {...user};
      delete (userWithoutPassword).user_password;
   
      return userWithoutPassword;
  }

  

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
