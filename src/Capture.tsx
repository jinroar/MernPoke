import React, { useState } from 'react';

const ProbabilityComponent: React.FC = () => {
    const [result, setResult] = useState<string | null>(null);

    const calculateProbability = () => {
        const probability = 1 / 3;
        const randomValue = Math.random();
        if (randomValue < probability) {
            setResult('Captured!!');
        } else {
            setResult('Lose');
        }
    };

    return (
        <div>
            <h1>Probability Game</h1>
            <button onClick={calculateProbability}>Play</button>
            {result && <p>{result}</p>}
        </div>
    );
};

export default ProbabilityComponent;
