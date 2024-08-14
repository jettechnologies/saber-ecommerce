// import React, { useState } from 'react';
// import { 
//     FeedbackDto,
//     ShoppingExperienceEnum,
//     ProductBrowsingExperienceEnum,
//     ProductAndImageDescriptionEnum,
//     CategoryProductAvailabilitySatisfactionEnum,
//     LikelihoodOfWebsiteRecommendationEnum
//  } from '@/types';
// import useApiRequest from '@/hooks/useApiRequest';
// import Select from './Select'; // Adjust the path as necessary

// const FeedbackForm: React.FC = () => {
//     const [formData, setFormData] = useState<FeedbackDto>({
//         email: '',
//         shoppingExperience: '', // Assume these enums have a default or handle differently
//         productBrowsingExperience: '',
//         productImageDescription: '',
//         categoryProductAvailability: '',
//         likelihoodOfWebsiteRecommendation: '',
//         additionalSatisfactionOrFeedback: ''
//     });

//     const { response, error, loading, makeRequest } = useApiRequest<any, any>({ method: 'POST' });

//     const handleChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLTextAreaElement | HTMLInputElement>) => {
//         const { name, value } = e.target;
//         setFormData(prev => ({
//             ...prev,
//             [name]: value
//         }));
//     };

//     const handleSubmit = async (e: React.FormEvent) => {
//         e.preventDefault();
//         await makeRequest(formData, '/browse/feedback');
//     };

//     // Generate options for selects based on enums
//     const getOptions = (enumObject: object) =>
//         Object.entries(enumObject).map(([key, value]) => ({ key, value }));

//     return (
//         <form onSubmit={handleSubmit} className="space-y-4">
//             <div>
//                 <label className="block text-sm font-medium text-gray-700">Email</label>
//                 <input
//                     type="email"
//                     name="email"
//                     value={formData.email}
//                     onChange={(e) => handleChange(e)}
//                     required
//                     className="mt-2 block w-full rounded-md border-[#c0c0c0] shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
//                 />
//             </div>

//             <div>
//                 <label className="block text-sm font-medium text-gray-700">Shopping Experience</label>
//                 <Select
//                     name="shoppingExperience"
//                     id="shoppingExperience"
//                     value={formData.shoppingExperience}
//                     select={getOptions(ShoppingExperienceEnum)}
//                     defaultText="Select Shopping Experience"
//                     handleInputChange={handleChange}
//                 />
//             </div>

//             <div>
//                 <label className="block text-sm font-medium text-gray-700">Product Browsing Experience</label>
//                 <Select
//                     name="productBrowsingExperience"
//                     id="productBrowsingExperience"
//                     value={formData.productBrowsingExperience}
//                     select={getOptions(ProductBrowsingExperienceEnum)}
//                     defaultText="Select Product Browsing Experience"
//                     handleInputChange={handleChange}
//                 />
//             </div>

//             <div>
//                 <label className="block text-sm font-medium text-gray-700">Product Image Description</label>
//                 <Select
//                     name="productImageDescription"
//                     id="productImageDescription"
//                     value={formData.productImageDescription}
//                     select={getOptions(ProductAndImageDescriptionEnum)}
//                     defaultText="Select Product Image Description"
//                     handleInputChange={handleChange}
//                 />
//             </div>

//             <div>
//                 <label className="block text-sm font-medium text-gray-700">Category Product Availability Satisfaction</label>
//                 <Select
//                     name="categoryProductAvailability"
//                     id="categoryProductAvailability"
//                     value={formData.categoryProductAvailability}
//                     select={getOptions(CategoryProductAvailabilitySatisfactionEnum)}
//                     defaultText="Select Category Product Availability"
//                     handleInputChange={handleChange}
//                 />
//             </div>

//             <div>
//                 <label className="block text-sm font-medium text-gray-700">Likelihood of Website Recommendation</label>
//                 <Select
//                     name="likelihoodOfWebsiteRecommendation"
//                     id="likelihoodOfWebsiteRecommendation"
//                     value={formData.likelihoodOfWebsiteRecommendation}
//                     select={getOptions(LikelihoodOfWebsiteRecommendationEnum)}
//                     defaultText="Select Likelihood of Website Recommendation"
//                     handleInputChange={handleChange}
//                 />
//             </div>

//             <div>
//                 <label className="block text-sm font-medium text-gray-700">Additional Feedback</label>
//                 <textarea
//                     name="additionalSatisfactionOrFeedback"
//                     value={formData.additionalSatisfactionOrFeedback}
//                     onChange={(e) => handleChange(e)}
//                     className="mt-2 block w-full rounded-md border-[#c0c0c0] shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
//                 />
//             </div>

//             <div className="text-right">
//                 <button
//                     type="submit"
//                     disabled={loading}
//                     className="inline-flex justify-center p-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//                 >
//                     {loading ? 'Submitting...' : 'Submit Feedback'}
//                 </button>
//             </div>

//             {error && <p className="mt-4 text-red-500">{error}</p>}
//             {response && <p className="mt-4 text-green-500">Feedback submitted successfully!</p>}
//         </form>
//     );
// };

// export default FeedbackForm;


import React, { useState, useMemo } from 'react';
import { 
    FeedbackDto,
    ShoppingExperienceEnum,
    ProductBrowsingExperienceEnum,
    ProductAndImageDescriptionEnum,
    CategoryProductAvailabilitySatisfactionEnum,
    LikelihoodOfWebsiteRecommendationEnum
} from '@/types';
import Button from "./Button";
import useApiRequest from '@/hooks/useApiRequest';
import Select from './Select'; // Adjust the path as necessary
import Toast from './Toast';
import { validateObject } from '@/utils/inputValidation';

const FeedbackForm: React.FC = () => {
    const [formData, setFormData] = useState<FeedbackDto>({
        email: '',
        shoppingExperience: '',
        productBrowsingExperience: '',
        productImageDescription: '',
        categoryProductAvailability: '',
        likelihoodOfWebsiteRecommendation: '',
        additionalSatisfactionOrFeedback: ''
    });

    console.log(formData)

    const { response, error, loading, makeRequest } = useApiRequest<{message:string}, FeedbackDto>({ method: 'POST' });

    // function to check if all the fields are been filled
    const isFilled = useMemo(() => {
        try {
          return validateObject(formData);
        } catch (err) {
          return false;
        }
      }, [formData]);

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLTextAreaElement | HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await makeRequest(formData, 'browse/feedback');
    };

    // Generate options for selects based on enums
    const getOptions = (enumObject: object) =>
        Object.entries(enumObject).map(([key, value]) => ({ key, value }));

    return (
        <div className="flex justify-center items-center min-h-screen p-4">
            <form onSubmit={handleSubmit} className="w-full max-w-4xl p-6 bg-white rounded-lg shadow-lg space-y-4 flex flex-col gap-y-3">
                <div className="w-full ">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder='Enter your email'
                        required
                        className="mt-2 block w-full p-2 rounded-md border border-[#c0c0c0] sm:text-sm"
                    />
                </div>

                <div className="w-full">
                    <label htmlFor="shoppingExperience" className="block text-sm font-medium text-gray-700">
                        Shopping Experience
                    </label>
                    <Select
                        name="shoppingExperience"
                        id="shoppingExperience"
                        value={formData.shoppingExperience}
                        select={getOptions(ShoppingExperienceEnum)}
                        defaultText="Select Shopping Experience"
                        handleInputChange={handleChange}
                        className="mt-2 block p-2 w-full rounded-md border border-[#c0c0c0] sm:text-sm"
                    />
                </div>

                <div className="w-full">
                    <label htmlFor="productBrowsingExperience" className="block text-sm font-medium text-gray-700">
                        Product Browsing Experience
                    </label>
                    <Select
                        name="productBrowsingExperience"
                        id="productBrowsingExperience"
                        value={formData.productBrowsingExperience}
                        select={getOptions(ProductBrowsingExperienceEnum)}
                        defaultText="Select Browsing Experience"
                        handleInputChange={handleChange}
                        className="mt-2 block p-2 w-full rounded-md border border-[#c0c0c0] sm:text-sm"
                    />
                </div>

                <div className="w-full">
                    <label htmlFor="productImageDescription" className="block text-sm font-medium text-gray-700">
                        Product Image Description
                    </label>
                    <Select
                        name="productImageDescription"
                        id="productImageDescription"
                        value={formData.productImageDescription}
                        select={getOptions(ProductAndImageDescriptionEnum)}
                        defaultText="Select Image Description"
                        handleInputChange={handleChange}
                        className="mt-2 block p-2 w-full rounded-md border border-[#c0c0c0] sm:text-sm"
                    />
                </div>

                <div className="w-full">
                    <label htmlFor="categoryProductAvailability" className="block text-sm font-medium text-gray-700">
                        Category Product Availability Satisfaction
                    </label>
                    <Select
                        name="categoryProductAvailability"
                        id="categoryProductAvailability"
                        value={formData.categoryProductAvailability}
                        select={getOptions(CategoryProductAvailabilitySatisfactionEnum)}
                        defaultText="Select Category Product Availability"
                        handleInputChange={handleChange}
                        className="mt-2 block p-2 w-full rounded-md border border-[#c0c0c0] sm:text-sm"
                    />
                </div>

                <div className="w-full">
                    <label htmlFor="likelihoodOfWebsiteRecommendation" className="block text-sm font-medium text-gray-700">
                        Likelihood of Website Recommendation
                    </label>
                    <Select
                        name="likelihoodOfWebsiteRecommendation"
                        id="likelihoodOfWebsiteRecommendation"
                        value={formData.likelihoodOfWebsiteRecommendation}
                        select={getOptions(LikelihoodOfWebsiteRecommendationEnum)}
                        defaultText="Select Likelihood of Website Recommendation"
                        handleInputChange={handleChange}
                       className="mt-2 block p-2 w-full rounded-md border border-[#c0c0c0] sm:text-sm"
                    />
                </div>

                <div className="w-full">
                    <label htmlFor="additionalSatisfactionOrFeedback" className="block text-sm font-medium text-gray-700">
                        Additional Feedback
                    </label>
                    <textarea
                        name="additionalSatisfactionOrFeedback"
                        id="additionalSatisfactionOrFeedback"
                        rows={3}
                        placeholder="Write your feedback here"
                        value={formData.additionalSatisfactionOrFeedback}
                        onChange={handleChange}
                        className="mt-2 block p-2 w-full rounded-md border border-[#c0c0c0] sm:text-sm"
                    />
                </div>

                <div className="text-right">
                    <Button
                        btnType="submit"
                        disabled={loading || !isFilled}
                        className="inline-flex justify-center p-3 w-full border border-transparent text-sm font-medium rounded-md text-white "
                    >
                        {loading ? 'Submitting...' : 'Submit Feedback'}
                    </Button>
                </div>

                {error && <Toast message={error} type = "error" />}
                {response && <Toast message={response?.message} type = "success" />}
            </form>
        </div>
    );
};

export default FeedbackForm;