@echo off
setlocal

pushd "%~dp0"

echo [1/3] Build static site...
cmd /c "set NEXT_PUBLIC_SITE_URL=https://media.dmikhin.ru&& npm run build:prod"
if errorlevel 1 (
  echo Build failed.
  popd
  exit /b 1
)

echo [2/3] Upload to Yandex Object Storage...
aws s3 sync ".\\out" s3://media.dmikhin.ru --endpoint-url https://storage.yandexcloud.net --profile yc --delete
if errorlevel 1 (
  echo Upload failed.
  popd
  exit /b 1
)

echo [2.1/3] Fix Content-Type for Decap config...
aws s3 cp ".\\out\\admin\\config.yml" s3://media.dmikhin.ru/admin/config.yml --endpoint-url https://storage.yandexcloud.net --profile yc --content-type "text/yaml"
if errorlevel 1 (
  echo Content-Type fix failed.
  popd
  exit /b 1
)

echo [3/3] Verify bucket root...
aws s3 ls s3://media.dmikhin.ru --endpoint-url https://storage.yandexcloud.net --profile yc

echo.
echo Deploy finished.
echo Check: http://media.dmikhin.ru
popd
endlocal
