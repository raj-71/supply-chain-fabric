const Error = ({ error }) => (
    <>
        {error ? (
            <div className="text-red-500 text-sm text-center  ">
                {error}
            </div>
        ) : null}
    </>
);

export default Error;