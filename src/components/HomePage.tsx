export function HomePage() {
	return (
		<>
			{/* Hero Section */}
			<div className='max-w-7xl mx-auto px-4 pt-24 pb-20 relative'>
				<div className='text-center'>
					<h1 className='text-5xl md:text-6xl font-bold text-theme-primary mb-6'>
						Let&apos;s Cook & Eat
						<span className='text-theme-subtle block'>Together</span>
					</h1>
					<p className='text-xl md:text-2xl text-theme-secondary max-w-3xl mx-auto mb-12 leading-relaxed'>
						Connect with family and friends over home-cooked meals.
						Share the joy of cooking, split the costs, and create
						memories around the dinner table.
					</p>

					<div className='flex flex-col sm:flex-row gap-4 justify-center mb-16'>
						<a
							href='/browse'
							className='px-8 py-4 btn-primary text-lg font-semibold rounded-xl transition-colors shadow-lg'
						>
							Find a Dinner
						</a>
						<a
							href='/create-event'
							className='px-8 py-4 btn-secondary text-lg font-semibold rounded-xl transition-colors'
						>
							Host a Dinner
						</a>
					</div>
				</div>
			</div>

			{/* How It Works */}
			<div className='bg-theme-primary py-20'>
				<div className='max-w-7xl mx-auto px-4'>
					<div className='text-center mb-16'>
						<h2 className='text-4xl font-bold text-theme-primary mb-4'>
							How It Works
						</h2>
						<p className='text-xl text-theme-muted max-w-2xl mx-auto'>
							Whether you want to join a dinner or host one,
							getting started is simple and fun.
						</p>
					</div>

					<div className='grid md:grid-cols-3 gap-8'>
						{/* For Guests */}
						<div className='bg-theme-card p-8 rounded-2xl shadow-lg border border-theme-primary'>
							<div className='mb-6'>
							<svg className='w-12 h-12 text-theme-primary mx-auto' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
								<path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' />
							</svg>
						</div>
							<h3 className='text-2xl font-bold text-theme-primary mb-4'>
								For Guests
							</h3>
							<ul className='text-theme-muted space-y-3'>
								<li className='flex items-start'>
									<svg className='w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5' fill='currentColor' viewBox='0 0 20 20'>
										<path fillRule='evenodd' d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z' clipRule='evenodd' />
									</svg>
									Browse dinner events in your area
								</li>
								<li className='flex items-start'>
									<svg className='w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5' fill='currentColor' viewBox='0 0 20 20'>
										<path fillRule='evenodd' d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z' clipRule='evenodd' />
									</svg>
									RSVP and split costs automatically
								</li>
								<li className='flex items-start'>
									<svg className='w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5' fill='currentColor' viewBox='0 0 20 20'>
										<path fillRule='evenodd' d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z' clipRule='evenodd' />
									</svg>
									Enjoy great food and company
								</li>
								<li className='flex items-start'>
									<svg className='w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5' fill='currentColor' viewBox='0 0 20 20'>
										<path fillRule='evenodd' d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z' clipRule='evenodd' />
									</svg>
									Meet new people in your community
								</li>
							</ul>
						</div>

						{/* For Hosts */}
						<div className='bg-theme-card p-8 rounded-2xl shadow-lg border border-theme-primary'>
							<div className='mb-6'>
							<svg className='w-12 h-12 text-theme-primary mx-auto' fill='currentColor' viewBox='0 0 24 24'>
								<path d='M12 2C8.5 2 6 4.5 6 8c0 1.5.5 3 1.5 4.5L8 13c.5.5 1 1 2 1h4c1 0 1.5-.5 2-1l.5-.5C17.5 11 18 9.5 18 8c0-3.5-2.5-6-6-6zM7 15c-1 0-1.5.5-1.5 1.5V20c0 1 .5 1.5 1.5 1.5h10c1 0 1.5-.5 1.5-1.5v-3.5c0-1-.5-1.5-1.5-1.5H7z' />
							</svg>
						</div>
							<h3 className='text-2xl font-bold text-theme-primary mb-4'>
								For Hosts
							</h3>
							<ul className='text-theme-muted space-y-3'>
								<li className='flex items-start'>
									<svg className='w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5' fill='currentColor' viewBox='0 0 20 20'>
										<path fillRule='evenodd' d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z' clipRule='evenodd' />
									</svg>
									Create dinner events with your menu
								</li>
								<li className='flex items-start'>
									<svg className='w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5' fill='currentColor' viewBox='0 0 20 20'>
										<path fillRule='evenodd' d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z' clipRule='evenodd' />
									</svg>
									Set participant limits and pricing
								</li>
								<li className='flex items-start'>
									<svg className='w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5' fill='currentColor' viewBox='0 0 20 20'>
										<path fillRule='evenodd' d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z' clipRule='evenodd' />
									</svg>
									Share cooking costs with guests
								</li>
								<li className='flex items-start'>
									<svg className='w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5' fill='currentColor' viewBox='0 0 20 20'>
										<path fillRule='evenodd' d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z' clipRule='evenodd' />
									</svg>
									Build your cooking community
								</li>
							</ul>
						</div>

						{/* For Everyone */}
						<div className='bg-theme-card p-8 rounded-2xl shadow-lg border border-theme-primary'>
							<div className='mb-6'>
							<svg className='w-12 h-12 text-theme-primary mx-auto' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
								<path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z' />
							</svg>
						</div>
							<h3 className='text-2xl font-bold text-theme-primary mb-4'>
								For Everyone
							</h3>
							<ul className='text-theme-muted space-y-3'>
								<li className='flex items-start'>
									<svg className='w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5' fill='currentColor' viewBox='0 0 20 20'>
										<path fillRule='evenodd' d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z' clipRule='evenodd' />
									</svg>
									Safe, verified community members
								</li>
								<li className='flex items-start'>
									<svg className='w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5' fill='currentColor' viewBox='0 0 20 20'>
										<path fillRule='evenodd' d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z' clipRule='evenodd' />
									</svg>
									Transparent pricing and reviews
								</li>
								<li className='flex items-start'>
									<svg className='w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5' fill='currentColor' viewBox='0 0 20 20'>
										<path fillRule='evenodd' d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z' clipRule='evenodd' />
									</svg>
									Easy messaging and coordination
								</li>
								<li className='flex items-start'>
									<svg className='w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5' fill='currentColor' viewBox='0 0 20 20'>
										<path fillRule='evenodd' d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z' clipRule='evenodd' />
									</svg>
									Create lasting friendships
								</li>
							</ul>
						</div>
					</div>
				</div>
			</div>

			{/* Footer Message */}
			<div className='bg-theme-card py-12 border-t border-theme-primary'>
				<div className='max-w-4xl mx-auto px-4 text-center'>
					<div className='text-theme-muted'>
						<p className='text-lg mb-2'>
							Have feedback, found a bug, or need help?
						</p>
						<p className='text-base'>
							I&apos;d love to hear from you! Reach out at{' '}
							<a
								href='mailto:buford@familydinner.com'
								className='text-blue-600 hover:text-blue-700 font-medium underline transition-colors'
							>
								buford@familydinner.me
							</a>
						</p>
					</div>
				</div>
			</div>
		</>
	);
}
