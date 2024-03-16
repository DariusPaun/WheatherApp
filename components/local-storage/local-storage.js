
import { createContext, useContext, useEffect, useState } from 'react';

const FrameworkContext = createContext();


function isObject(obj) {
    return obj !== null && typeof obj === 'object' && !Array.isArray(obj);
}

export const FrameworkProvider = ({ children }) => {
    const [selectedFrameworks, setSelectedFrameworks] = useState(() => {
        const storedData = JSON.parse(localStorage.getItem('yourLocalStorageKey')) || [];
        return storedData.map(item => item.value);
    });

    const addFramework = (framework) => {
        setSelectedFrameworks((prevFrameworks) => [...prevFrameworks, framework]);
    };

    const removeFramework = (framework) => {
        setSelectedFrameworks((prevFrameworks) =>
            prevFrameworks.filter((f) => f !== framework)
        );
    };

    // Update localStorage whenever selectedFrameworks changes
    useEffect(() => {
        const storedData = selectedFrameworks.map(value => {
            if (isObject(value)) {
                // If value is an object, assume it's coordinates and extract the label
                return { value: value, label: `${value.lat},${value.lon}` };
            } else {
                // If value is not an object, assume it's already in the desired format
                return { value: value, label: value };
            }
        });
        localStorage.setItem('yourLocalStorageKey', JSON.stringify(storedData));
    }, [selectedFrameworks]);

    return (
        <FrameworkContext.Provider
            value={{ selectedFrameworks, addFramework, removeFramework }}
        >
            {children}
        </FrameworkContext.Provider>
    );
};

export const useFrameworkContext = () => useContext(FrameworkContext);
