import http from 'k6/http'
import { check, group } from 'k6'
const testConfig = JSON.parse(open('../configs/stages.json'))

export const options = {
    stages: testConfig.stages,
    thresholds: {
        http_req_duration: ['p(95)<100']
    }
}
export default function () {
    group("get data from endpoint", function () {
        const getRequest = http.get("https://fakerestapi.azurewebsites.net/api/v1/Authors")
        check(getRequest, {
            "getRequest has status 200": (request) => request.status === 200
        })
    })
}
