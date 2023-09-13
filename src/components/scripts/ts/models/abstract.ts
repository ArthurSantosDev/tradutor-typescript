export type Translation = {
    'from_lang': string;
    'to_lang': string;
    'word': string;
};

export type Options = {
    'method': string;
    'headers': {
        'X-RapidAPI-Key': string;
        'X-RapidAPI-Host': string
    }
}