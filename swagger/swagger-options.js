const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Interview Test - OpenAPI 3.0',
      description: `This is an API documentation for Email app`,
      version: 'v1',
    },
    servers: [
      {
        url: 'https://backend-interview-test.vercel.app',
      },
    ],
    paths: {
      '/register': {
        post: {
          tags: ['User'],
          summary: 'Register Route',
          description: 'This is register route.',
          operationId: 'registerNewUser',
          requestBody: {
            description: 'Register new user route',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/RegisterModel',
                },
              },
              'application/x-www-form-urlencoded': {
                schema: {
                  $ref: '#/components/schemas/RegisterModel',
                },
              },
            },
          },
          responses: {
            default: {
              description: 'Registered Successfully',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/UserModel',
                  },
                },
              },
            },
          },
          'x-swagger-router-controller': 'UserModel',
        },
      },
      '/get-user-messages': {
        get: {
          tags: ['User'],
          summary: 'Get User Received Messages route',
          description: 'This route gets all user received messages.',
          operationId: 'getUserMessages',

          responses: {
            200: {
              description: 'Fetched successfully',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/UserModel',
                  },
                },
              },
            },
            400: {
              description: 'Invalid ID supplied',
            },
            404: {
              description: 'No Product found',
            },
          },
          'x-swagger-router-controller': 'UserModel',
        },
      },
      '/send-mail': {
        post: {
          tags: ['User Message'],
          summary: 'Send Message Route',
          description: 'This Route toggles sends message to users',
          operationId: 'toggleMessage',
          requestBody: {
            description: 'Send Message / email route',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/SendMailModel',
                },
              },
              'application/x-www-form-urlencoded': {
                schema: {
                  $ref: '#/components/schemas/SendMailModel',
                },
              },
            },
          },
          responses: {
            200: {
              description: 'email sent',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/EmailModel',
                  },
                },
              },
            },
            400: {
              description: 'Bad request',
            },
            404: {
              description: 'Mail not found',
            },
          },
          'x-swagger-router-controller': 'EmailModel',
        },
      },
      '/read-mail': {
        put: {
          tags: ['User Message'],
          summary: 'This toggles user message isRead to true',
          description: 'This Route toggles user message isRead to true',
          operationId: 'toggleMessage',
          requestBody: {
            description: 'Toggle message isRead state to true route',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/toggleMessageModel',
                },
              },
              'application/x-www-form-urlencoded': {
                schema: {
                  $ref: '#/components/schemas/toggleMessageModel',
                },
              },
            },
          },
          responses: {
            200: {
              description: 'Successful',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/EmailModel',
                  },
                },
              },
            },
            400: {
              description: 'Bad request',
            },
            404: {
              description: 'Mail not found',
            },
          },
          'x-swagger-router-controller': 'EmailModel',
        },
      },
    },
    components: {
      schemas: {
        UserModel: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              example: 'rtynnmma234245',
            },

            first_name: {
              type: 'string',
              example: 'John',
            },
            last_name: {
              type: 'string',
              example: 'Doe',
            },
            email: {
              type: 'string',
              example: 'johndoe@gmail.com',
            },
            password: {
              type: 'string',
              example: 'John2020#1&&',
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              example: '2024-02-19T09:58:53.385Z',
            },
            updatedAt: {
              type: 'string',
              format: 'date-time',
              example: '2024-02-19T09:58:53.385Z',
            },
          },
        },
        RegisterModel: {
          type: 'object',
          properties: {
            first_name: {
              type: 'string',
              example: 'John',
            },
            last_name: {
              type: 'string',
              example: 'Doe',
            },
            email: {
              type: 'string',
              example: 'johndoe@gmail.com',
            },
            password: {
              type: 'string',
              example: 'John2020#1&&',
            },
          },
        },
        ToggleMessageModel: {
          type: 'object',
          properties: {
            mailId: {
              type: 'string',
              example: '224367893003ddft',
            },
          },
        },
        EmailModel: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              example: 'rtynnmma234245',
            },

            sender_Id: {
              type: 'string',
              example: '22456738399fg',
            },
            receiver_Id: {
              type: 'string',
              example: '3346278280ht',
            },
            sender_email: {
              type: 'string',
              example: 'johndoe@gmail.com',
            },
            receiver_email: {
              type: 'string',
              example: 'marydoe@gmail.com',
            },
            subject: {
              type: 'string',
              example: 'Hello dear',
            },
            content: {
              type: 'string',
              example: 'How are you doing john',
            },
            isRead: {
              type: 'boolean',
              example: 'false',
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              example: '2024-02-19T09:58:53.385Z',
            },
            updatedAt: {
              type: 'string',
              format: 'date-time',
              example: '2024-02-19T09:58:53.385Z',
            },
          },
        },
        SendMailModel: {
          type: 'object',
          properties: {
            sender_email: {
              type: 'string',
              example: 'johndoe@gmail.com',
            },
            receiver_email: {
              type: 'string',
              example: 'marydoe@gmail.com',
            },
            subject: {
              type: 'string',
              example: 'Hello dear',
            },
            content: {
              type: 'string',
              example: 'How are you doing john',
            },
          },
        },
      },
      responses: {
        ApiResponse: {
          type: 'object',
          properties: {
            code: {
              type: 'integer',
              format: 'int32',
            },
            type: {
              type: 'string',
            },
            message: {
              type: 'string',
            },
          },
          example: {
            code: 0,
            type: 'type',
            message: 'message',
          },
        },
      },
    },
  },
  apis: ['../routes/*.js'],
};

module.exports = swaggerOptions;
