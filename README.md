# NestJS DDD template

<div align=center>

![NestJS](https://img.shields.io/badge/nestjs-%23E0234E.svg?style=for-the-badge&logo=nestjs&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)

[![Test Status](https://github.com/industriously/account-server/actions/workflows/push_test_report.yml/badge.svg)](https://github.com/industriously/account-server/actions/workflows/push_test_report.yml)
[![Test Report](https://img.shields.io/endpoint?url=https://gist.githubusercontent.com/industriously/6c52fea04bb0438d9557e0959bbec5ec/raw/coverage_account.json)](https://industriously.github.io/account-server)

</div>

## 개요

nestjs기반의 프로젝트에서 사용할 보일러플레이트

- 사용자 인증/crud api 구현
- aop provider & util function 등 제공
- prisma + nestia 적용
- ddd 아키텍처 적용(노력중)

## Github 환경 변수

### secrets

```
GIST_SECRET // gist 수정 권한 필요
```

### variables

```
ACCESS_TOKEN_PRIVATE_KEY
ACCESS_TOKEN_PUBLIC_KEY
GIST_ID
```

## API 문서

- [View in the `Swagger Editor`](https://editor.swagger.io/?url=https://raw.githubusercontent.com/industriously/account-server/main/swagger.json)
