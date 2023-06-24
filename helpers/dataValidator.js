export function phoneValidator(phone) {
    if (!phone || phone.length === 0) {
        return 'يرجى إدخال رقم الهاتف';
    }

    const phoneRegex = /^[0-9]{10}$/; // 10 digits phone number format
    if (!phoneRegex.test(phone)) {
        return 'رقم الهاتف غير صحيح';
    }

    return '';
}

export function nameValidator(name) {
    if (!name || name.length === 0) {
        return 'يرجى إدخال الاسم';
    }

    return '';
}

export function addressValidator(address) {
    if (!address || address.length === 0) {
        return 'يرجى إدخال العنوان';
    }



    return '';
}



export function usernameValidator(username) {
    if (!username) {
        return 'يرجى إدخال اسم المستخدم';
    }
    return '';
};

