const Success = ({ success }) => (
    <>
        {success ? (
            <>
                <div className="text-green-500 text-sm text-center">
                    {success}
                </div>
            </>
        ) : null}
    </>
);

export default Success;