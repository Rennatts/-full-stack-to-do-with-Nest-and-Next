import { Test, TestingModule } from '@nestjs/testing';
import { TodosService } from './todos.service';
import { Todo } from './entities/todo.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CreateTodoDto } from './dto/create-todo.dto';
import { PriorityLevel } from './entities/priority-level.enum';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { NotFoundException } from '@nestjs/common';


type MockType<T> = {
  [P in keyof T]?: jest.Mock<{}>;
};

interface MockRepository<T = any> {
  find: jest.Mock;
  findOneBy: jest.Mock;
  create: jest.Mock;
  save: jest.Mock<Promise<T>, [T]>;
  delete: jest.Mock;
  preload: jest.Mock;
}

const mockRepository = () => ({
  create: jest.fn(),
  save: jest.fn(),
  find: jest.fn(),
  findOneBy: jest.fn(),
  preload: jest.fn(),
  delete: jest.fn(),
});


describe('TodosService', () => {
  let service: TodosService;
  let todoRepository: MockRepository<Todo>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TodosService,
        {
          provide: getRepositoryToken(Todo),
          useValue: mockRepository(), 
        },
      ],
    }).compile();
  
    service = module.get<TodosService>(TodosService);
    todoRepository = module.get<MockRepository<Todo>>(getRepositoryToken(Todo));
  });
  
  

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should successfully create a todo', async () => {
      const saveToTodo: CreateTodoDto = {
        title: "Test Todo",
        category: "Test Category",
        isCompleted: false, 
        priorityLevel: PriorityLevel.MEDIUM,
        dueDate: new Date(),
      };
    
      const returnSaveToTodo: Todo = {
        id: 1, 
        title: "Test Todo",
        category: "Test Category",
        isCompleted: false, 
        priorityLevel: PriorityLevel.MEDIUM,
        dueDate: new Date(),
      };
    
      todoRepository.create.mockReturnValue(saveToTodo); 
      todoRepository.save.mockResolvedValue(returnSaveToTodo); 
    
      expect(await service.create(saveToTodo)).toEqual(returnSaveToTodo);
      expect(todoRepository.create).toHaveBeenCalledWith(saveToTodo);
      expect(todoRepository.save).toHaveBeenCalledWith(saveToTodo);
    });
    
  });

  describe('findAll', () => {
    it('should return an array of todos', async () => {
      const result = [{ title: 'Test Todo', description: 'Test Description' }];
      todoRepository.find.mockResolvedValue(result);
  
      expect(await service.findAll()).toEqual(result);
    });
  });

  describe('update', () => {
    it('should update a todo item successfully', async () => {
      const id = 1;
      const todoUpdateDto: UpdateTodoDto = { isCompleted: true };
      const updatedTodo: Todo = { ...todoUpdateDto, id } as Todo; 
      
      todoRepository.preload.mockResolvedValue(updatedTodo);
      todoRepository.save.mockResolvedValue(updatedTodo);
  
      expect(await service.update(id, todoUpdateDto)).toEqual(updatedTodo);
      expect(todoRepository.preload).toHaveBeenCalledWith({ id, ...todoUpdateDto } as Todo); 
      expect(todoRepository.save).toHaveBeenCalledWith(updatedTodo);
    });
  
    it('should throw if todo to update is not found', async () => {
      todoRepository.preload.mockResolvedValue(undefined); 
  
      await expect(service.update(1, { isCompleted: true })).rejects.toThrow(NotFoundException);
    });
  });

  
});
