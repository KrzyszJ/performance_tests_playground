import http from 'k6/http'
import { check, group } from 'k6'
import faker from 'https://cdnjs.cloudflare.com/ajax/libs/Faker/3.1.0/faker.min.js'
const testConfig = JSON.parse(open('../configs/stages.json'))

export const options = {
    stages: testConfig.stages,
    thresholds: {
        http_req_duration: ['p(95)<100']
    }
}

export default function () {
    const data = {
        "id": 0,
        "idBook": 0,
        "firstName": faker.name.firstName(),
        "lastName": faker.name.lastName()
    }
    group("post data to endpoint", function () {
        const postRequest = http.post("https://fakerestapi.azurewebsites.net/api/v1/Authors",
            JSON.stringify(data),
            {headers: {'Content-Type': 'application/json'}}
        )
        check(postRequest, {
            "postRequest has status 200": (request) => request.status === 200
        })
    })
}
