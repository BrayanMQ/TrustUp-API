# Testing Structure

## Organization

```
test/
├── unit/
│   ├── services/
│   ├── controllers/
│   └── utils/
├── e2e/
├── fixtures/
└── helpers/
```

## Unit Tests

### Services
- `test/unit/services/{module}.service.spec.ts`
- Mock dependencies
- Test business logic

### Controllers
- `test/unit/controllers/{module}.controller.spec.ts`
- Mock services
- Test input validation

### Utils
- `test/unit/utils/{util}.spec.ts`
- Pure tests without dependencies

## E2E Tests

- `test/e2e/{module}.e2e-spec.ts`
- Full flow tests
- Test database

## Fixtures

- `test/fixtures/`: Reusable test data
- Factories to create test entities
- Shared mocks

## Helpers

- `test/helpers/`: Test utilities
- Authentication helpers
- Database helpers

## Test Structure

```typescript
describe('ModuleService', () => {
  let service: ModuleService;
  let repository: MockRepository;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        ModuleService,
        { provide: Repository, useValue: mockRepository }
      ]
    }).compile();

    service = module.get<ModuleService>(ModuleService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
```

## Conventions

- One `.spec.ts` file per source file
- Use `describe` and `it` for organization
- Mock all external dependencies
- Independent and deterministic tests
