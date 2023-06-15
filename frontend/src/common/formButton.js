import Loader from "./loader";

const FormButton = ({ name, loader }) => (
    <>
        <button
            type="submit"
            className="w-full bg-indigo-600 text-white  hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-semibold rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
        >
            {loader ? <Loader height={5} width={5} /> : name}
        </button>
    </>
);

export default FormButton;