require('dotenv').config();

const config = {
    dbUrl: process.env.DB_URL || 'url',
    port: process.env.PORT || 3000,
    host: process.env.HOST || 'http://localhost:3000',
    sengridApiKey: process.env.SENGRID_API_KEY,
    publicRoute: process.env.PUBLIC_ROUTE || '/app',
    filesRoute: process.env.FILES_ROUTE || 'files',
    secretKey : process.env.SECRET_KEY || 'my_key',
    azureBlobConnectionString: process.env.AZURE_STORAGE_CONNECTION_STRING || 'DefaultEndpointsProtocol=https;AccountName=yourAcount;AccountKey=yourKey;EndpointSuffix=core.windows.net',
    azureBlobClave: process.env.AZURE_STORAGE_CLAVE || 'yourPasswordAzureStorage',
    azureBlobHostName: process.env.BLOB_HOST_NAME || 'yourServerNameBlobAzure'
};

module.exports = config;