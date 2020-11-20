const request = require('supertest');
import App from '../src/app';

describe('Test the root path', () => {
    test('It should response the GET method', async (done) => {
        const response = await request(App.instance.app).get('/');
        expect(response.statusCode).toBe(200);
        done();
    });
});