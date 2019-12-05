function success({data}){
    if(!data){
        throw new Error("Missing data")
    }
    return{
        success: true,
        data
    }
};

function fail({reason}) {
    return{
        success: false,
        reason
    }
};

module.exports = {
    success,
    fail
};