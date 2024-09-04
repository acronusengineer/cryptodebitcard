// Authorization models

export interface Auth {
    accesstoken:string;
    refreshtoken:string;
}

// Operations with users

export interface User {
    details: {
        name:string;
        partnerId:string;
    }
    apiKey:string;
    secret:string;
    privateKey:string
}

// Balance models

export interface Getpartner {
    currency:Currency[];
}

export interface Currency {
    amount:string;
    pendingAmount:string;
}


// Deposit
