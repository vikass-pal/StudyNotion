import React from 'react';

const Tab = ({ tabData, field, setField }) => {
    return (
        <div className="flex">
            {tabData.map((tab) => (
                <button
                    key={tab.id}
                    onClick={() => setField(tab.type)}
                    className={`p-2 ${field === tab.type ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                >
                    {tab.tabName}
                </button>
            ))}
        </div>
    );
};

export default Tab;
