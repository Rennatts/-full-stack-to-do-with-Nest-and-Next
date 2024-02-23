import { Test, TestingModule } from '@nestjs/testing';
import { TodosController } from './todos.controller';
import { TodosService } from './todos.service';
import { PriorityLevel } from './entities/priority-level.enum';

const mockTodosService = {
  create: jest.fn(),
  findAll: jest.fn(),
  findOne: jest.fn(),
  update: jest.fn(),
  remove: jest.fn(),
};


describe('TodosController', () => {
  let controller: TodosController;
  let service: TodosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TodosController],
      providers: [
        {
          provide: TodosService,
          useValue: mockTodosService,
        },
      ],
    }).compile();
  
    controller = module.get<TodosController>(TodosController);
    service = module.get<TodosService>(TodosService);
  });



  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should call TodosService.create and return the result', async () => {
      const createTodoDto = {
        title: "first todo",
        category: "work",
        priorityLevel: PriorityLevel.HIGH,
        dueDate: new Date("2024-02-20T00:00:00.000Z") 
      }; 
  
      const createdTodo = {
        id: 1,
        ...createTodoDto,
        dueDate: new Date(createTodoDto.dueDate) 
      };
      
      (service.create as jest.Mock).mockResolvedValue(createdTodo);
      
      await expect(controller.create(createTodoDto)).resolves.toEqual(createdTodo);
      expect(service.create).toHaveBeenCalledWith(expect.objectContaining({
        ...createTodoDto,
        dueDate: expect.any(Date)
      }));
    });
  });
  


  describe('findAll', () => {
    it('should call TodosService.findAll and return the result', async () => {
      const result = [{ id: 1, title: 'Test Todo', description: 'Test Description' }];
      (service.findAll as jest.Mock).mockResolvedValue(result);
  
      await expect(controller.findAll()).resolves.toEqual(result);
      expect(service.findAll).toHaveBeenCalled();
    });
  });
  

  describe('update', () => {
    it('should call TodosService.update with id and updateTodoDto and return the result', async () => {
      const id = 1; 
      const updateTodoDto = { title: 'Updated Test Todo' };
      const result = { id, ...updateTodoDto };
  
      (service.update as jest.Mock).mockResolvedValue(result);
  
      await expect(controller.update(id.toString(), updateTodoDto)).resolves.toEqual(result);
      expect(service.update).toHaveBeenCalledWith(id, updateTodoDto);
    });
  });
  

  describe('remove', () => {
    it('should call TodosService.remove with an id', async () => {
      const id = 1;
      (service.remove as jest.Mock).mockResolvedValue(undefined);
  
      await controller.remove(id.toString());
      expect(service.remove).toHaveBeenCalledWith(id);
    });
  });
  
});
