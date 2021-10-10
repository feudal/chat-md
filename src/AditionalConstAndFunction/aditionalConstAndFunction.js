export const realtimeDatabaseUrl = 'https://chat-6f549-default-rtdb.europe-west1.firebasedatabase.app/';

export const findKeyWithEmailFromData = (data, email) => {
    for (const key in data) {
        if (data.hasOwnProperty(key)) {
            if (data[key].email === email) {
                return key;
            }
        }
    }
}

export const formatEmail = (email) => {
    if (email) {
        email = email.replace(/\./g, '-')
        email = email.replace('@', '-aron-')
        return email;
    }
}

export const findSecondFragment = (data, email) => {
    let secondFragmentUrl;
    for (const key in data) for (const key2 in data[key]) {
        if (key2.includes(formatEmail(email)) && key2.includes(formatEmail(localStorage.email))) {
            secondFragmentUrl = '/' + key + '/' + key2 + '.json';
        }
    }
    return secondFragmentUrl;
}