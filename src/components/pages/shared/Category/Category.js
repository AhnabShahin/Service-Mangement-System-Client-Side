import React, { useState } from 'react';
import AddCategory from './../AddCategory/AddCategory';
import AddSubCategory from './../AddSubCategory/AddSubCategory';

const Category = () => {
    const [massage, setMassage] = useState('');
    return (
        <div>
            <AddCategory massage={massage} setMassage={setMassage}/>
            <AddSubCategory  categoryAdded={massage}/>
        </div>
    );
};

export default Category;