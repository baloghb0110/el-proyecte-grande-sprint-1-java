import { useUser } from '@src/context/UserContext.jsx';

const useUpdateLocalBalance = () => {
  const { user, setUser } = useUser();

  const updateLocalBalance = (amount, direction) => {
    const newUser = { ...user };

    if (direction) {
      newUser.actualBalance += Number(amount) * -1;
      newUser.savingsBalance += Number(amount);
    } else {
      newUser.actualBalance += Number(amount) * -1;
      newUser.savingsBalance += Number(amount);
    }

    setUser(newUser);
  };


  return {
    updateLocalBalance,
  };
};

export {
  useUpdateLocalBalance,
};
