const errowMixin = {
    methods: {
        displayError(error){
            for (const errors in error.response.data) {
                if (Object.hasOwnProperty.call(error.response.data, errors)) {
                  const element = error.response.data[errors];
                  element.forEach((error) => {
                    this.$notify({
                      type: 'error',
                      title: 'Error',
                      text: error,
                    });
                  });
                }
              }
        }
    }
   
}

export default errowMixin;