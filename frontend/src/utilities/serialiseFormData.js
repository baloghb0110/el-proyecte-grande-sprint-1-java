const serialiseFormData = (data) => {
  const formData = [...new FormData(data).entries()];

  const reducedFormData = formData.reduce((acc, curr) => {
    const [key, value] = curr;

    acc[key] = value;

    return acc;
  }, {});

  return reducedFormData;
};

export default serialiseFormData;
