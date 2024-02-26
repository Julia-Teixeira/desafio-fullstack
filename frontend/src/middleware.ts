import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

const middleware = (request: NextRequest) => {
	const token = request.cookies.get("user.token")
	const url = request.url;

	if (
		!token &&
		(url.includes("/products") || url.includes("/addProduct/") || url.includes("/editProduct/") || url.includes("/myProducts"))	 
	) {
		return NextResponse.redirect(new URL("/", url));
	}
};

const config = {
	matcher: ["/", "addProduct", "products", "editProduct"],
};
export { middleware, config };