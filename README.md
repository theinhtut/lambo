# Lambo
A simple severless setup using AWS Lambda functions to read/write to DynamoDB

![Simple serverless architecture](./img/simple-serverless-architecture.jpg)

## Useful commands
Some of the useful commands while invoking Lambda functions locally

- Run DynamoDB locally

      $ docker run --network=lambda-local -d -p 8000:8000 amazon/dynamodb-local

- List all tables

      $ aws dynamodb list-tables --endpoint-url http://localhost:8000

- Create new table

      $ aws dynamodb create-table --table-name FeedbackMsgTable --attribute-definitions AttributeName=id,AttributeType=S --key-schema AttributeName=id,KeyType=HASH --provisioned-throughput ReadCapacityUnits=5,WriteCapacityUnits=5 --endpoint-url=http://localhost:8000

- Describe table

      $ aws dynamodb describe-table --table-name FeedbackMsgTable --endpoint-url http://localhost:8000

- Writing Record

      $ aws dynamodb put-item --table-name FeedbackMsgTable --item file://./events/addItem.json --endpoint-url http://localhost:8000

- Getting Records

      $ aws dynamodb get-item --table-name FeedbackMsgTable --key file://./events/getItem.json --endpoint-url http://localhost:8000

- Scanning Records

      $ aws dynamodb scan --table-name FeedbackMsgTable --endpoint-url http://localhost:8000

- Delete table

      $ aws dynamodb delete-table --table-name FeedbackMsgTable --endpoint-url http://localhost:8000

- Invoke Lambda func locally

      $ sam local invoke GetFeedbackMsgDataFunction --event ./events/event.json --docker-network lambda-local
      $ sam local invoke PostFeedbackMsgDataFunction --event ./events/event.json --docker-network lambda-local
