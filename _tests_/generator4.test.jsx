import {createMocks} from 'node-mocks-http'
import generator4 from "@/pages/api/generator4";
import '@testing-library/jest-dom'

describe('/api/generator4', () => {
    it('should be 400', async function () {

        const {req, res} = createMocks({
            method: 'GET',
            body: {
                input: ''
            }
        })
        await generator4(req, res);

        expect(res._getStatusCode()).toBe(400);
    });

    it('should be 200', async () => {
        const {req, res} = createMocks({
            method: 'GET',
            body: {
                input: 'Hello, ChatGpt'
            }
        });
        await generator4(req, res);

        expect(res._getStatusCode()).toBe(200);
        expect(res._getJSONData()).toHaveProperty('result');
        // expect(res._getData().message())
    })
})