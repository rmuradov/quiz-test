// Load method categories.
import _lodash from 'lodash';

export const apiErrorsParser = (errors) => {
    var errorStr = [];

    const traverse = (data) => {
        if (_lodash.isObject(data)) {
            _lodash.forOwn(data, (val, key) => {
                traverse(val);
            });
        }
        else {
            if (_lodash.isArray(data)) {
                data.forEach((el) => {
                    traverse(el);
                });
            }
            else {
                errorStr.push(data);
            }
        }
    };

    traverse(errors);

    return errorStr.length ? errorStr.join("\n") : '';
};
