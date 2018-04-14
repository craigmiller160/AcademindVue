export const updateValue = (context, payload) => {
    context.commit('updateValue', payload);
};

export const action2 = context => {
    console.log('Action 2');
};
