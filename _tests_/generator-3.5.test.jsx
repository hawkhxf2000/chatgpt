import {createMocks} from 'node-mocks-http'
import generator35 from "@/pages/api/generator-3.5";
import '@testing-library/jest-dom'

describe('/api/generator-3.5', () => {
    it('should be 400', async function () {

        const {req, res} = createMocks({
            method: 'GET',
            body: {
                input: ''
            }
        })
        await generator35(req, res);

        expect(res._getStatusCode()).toBe(400);
    });

    it('should be 200', async () => {
        const {req, res} = createMocks({
            method: 'GET',
            body: {
                input: 'Hello, ChatGpt'
            }
        });
        await generator35(req, res);

        expect(res._getStatusCode()).toBe(200);
        expect(res._getJSONData()).toHaveProperty('result.content');
        // expect(res._getData().message())
    })
})