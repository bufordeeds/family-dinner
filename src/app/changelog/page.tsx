import { Navigation } from '@/components/Navigation';
import Script from 'next/script';

export default function ChangelogPage() {
	return (
		<div className='min-h-screen bg-theme-primary'>
			<Navigation />
			<div className='container mx-auto px-4 py-8 max-w-4xl mt-16'>
				<header className='mb-8'>
					<h1 className='text-4xl font-bold text-theme-primary mb-4'>
						Changelog
					</h1>
					<p className='text-lg text-theme-muted'>
						Track the latest updates, new features, and improvements
						to Family Dinner.
					</p>
				</header>

				<div className='space-y-8'>
					{/* Latest Updates */}
					<section className='bg-theme-secondary rounded-lg p-6'>
						<h2 className='text-2xl font-semibold text-theme-primary mb-4 flex items-center gap-2'>
							<svg className='w-6 h-6' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
								<path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2m3 0H4a2 2 0 00-2 2v12a2 2 0 002 2h16a2 2 0 002-2V6a2 2 0 00-2-2zM9 9l3 3 5-5' />
							</svg>
							Latest Updates
						</h2>

						<div className='max-h-96 overflow-y-auto space-y-6 pr-2'>
							<div className='border-l-4 border-orange-500 pl-4'>
								<div className='flex items-center gap-2 mb-2'>
									<span className='text-sm font-medium text-theme-subtle'>
										June 29, 2025
									</span>
									<span className='px-2 py-1 text-xs badge-success rounded-full'>
										Enhancement
									</span>
								</div>
								<h3 className='text-lg font-medium text-theme-primary mb-1'>
									Warm & Cozy Theme Update
								</h3>
								<p className='text-theme-muted'>
									Transformed the app with a warm, cozy color palette featuring 
									soft creams, burnt orange, and deep chocolate tones. Thank you 
									to Case for the amazing suggestion!
								</p>
							</div>

							<div className='border-l-4 border-blue-500 pl-4'>
								<div className='flex items-center gap-2 mb-2'>
									<span className='text-sm font-medium text-theme-subtle'>
										June 28, 2025
									</span>
									<span className='px-2 py-1 text-xs badge-success rounded-full'>
										Fix
									</span>
								</div>
								<h3 className='text-lg font-medium text-theme-primary mb-1'>
									Enhanced Route Handling & Event Forms
								</h3>
								<p className='text-theme-muted'>
									Updated Next.js route parameters to async
									for better performance and fixed event form
									initialization issues.
								</p>
							</div>

							<div className='border-l-4 border-green-500 pl-4'>
								<div className='flex items-center gap-2 mb-2'>
									<span className='text-sm font-medium text-theme-subtle'>
										June 27, 2025
									</span>
									<span className='px-2 py-1 text-xs badge-info rounded-full'>
										Feature
									</span>
								</div>
								<h3 className='text-lg font-medium text-theme-primary mb-1'>
									Comprehensive Dashboard Event Management
								</h3>
								<p className='text-theme-muted'>
									Added powerful event management actions to
									the dashboard, making it easier for chefs to
									organize and track their dinner events.
								</p>
							</div>

							<div className='border-l-4 border-purple-500 pl-4'>
								<div className='flex items-center gap-2 mb-2'>
									<span className='text-sm font-medium text-theme-subtle'>
										June 26, 2025
									</span>
									<span className='px-2 py-1 text-xs badge-purple rounded-full'>
										Enhancement
									</span>
								</div>
								<h3 className='text-lg font-medium text-theme-primary mb-1'>
									Improved Theme System
								</h3>
								<p className='text-theme-muted'>
									Implemented a centralized theme system with
									consistent styling across all components for
									a better user experience.
								</p>
							</div>
						</div>
					</section>

					{/* Community Contributions */}
					<section className='bg-theme-secondary rounded-lg p-6'>
						<h2 className='text-2xl font-semibold text-theme-primary mb-4 flex items-center gap-2'>
							<svg className='w-6 h-6' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
								<path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z' />
							</svg>
							Community Contributions
						</h2>
						<p className='text-theme-muted mb-4'>
							We love hearing from our users! Here are some great
							suggestions from the community that are helping
							shape the future of Family Dinner.
						</p>

						<div className='max-h-80 overflow-y-auto space-y-4 pr-2'>
							<div className='bg-theme-card rounded-lg p-4 border border-theme-primary'>
								<div className='flex items-start gap-3'>
									<div className='w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white font-semibold text-sm'>
										C
									</div>
									<div className='flex-1'>
										<div className='flex items-center gap-2 mb-1'>
											<span className='font-medium text-theme-primary'>
												Case
											</span>
											<span className='text-sm text-theme-subtle'>
												• Suggested
											</span>
										</div>
										<h4 className='font-medium text-theme-primary mb-1'>
											Warm & Cozy Theme Colors
										</h4>
										<p className='text-sm text-theme-muted mb-2'>
											&quot;BIG fan of your site! I think it would look even better with 
											theme colors that feel more home-y, warm, and cozy!&quot;
										</p>
										<div className='flex items-start gap-2'>
											<span className='px-2 py-1 text-xs badge-success rounded-full flex-shrink-0 flex items-center'>
												<svg className='w-3 h-3' fill='currentColor' viewBox='0 0 20 20'>
													<path fillRule='evenodd' d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z' clipRule='evenodd' />
												</svg>
											</span>
											<span className='text-xs text-theme-subtle'>
												<span className='font-medium text-theme-subtle'>Implemented</span> - What an amazing suggestion, Case! The warm palette transforms the entire experience!
											</span>
										</div>
									</div>
								</div>
							</div>

							<div className='bg-theme-card rounded-lg p-4 border border-theme-primary'>
								<div className='flex items-start gap-3'>
									<div className='w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold text-sm'>
										A
									</div>
									<div className='flex-1'>
										<div className='flex items-center gap-2 mb-1'>
											<span className='font-medium text-theme-primary'>
												Adam
											</span>
											<span className='text-sm text-theme-subtle'>
												• Suggested
											</span>
										</div>
										<h4 className='font-medium text-theme-primary mb-1'>
											Pre-populate User Data in RSVP Forms
										</h4>
										<p className='text-sm text-theme-muted mb-2'>
											&quot;It would be great if the RSVP form
											could automatically fill in my name and
											email since I&apos;m already signed in,
											instead of asking me to provide this
											information again.&quot;
										</p>
										<div className='flex items-start gap-2'>
											<span className='px-2 py-1 text-xs badge-success rounded-full flex-shrink-0 flex items-center'>
												<svg className='w-3 h-3' fill='currentColor' viewBox='0 0 20 20'>
													<path fillRule='evenodd' d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z' clipRule='evenodd' />
												</svg>
											</span>
											<span className='text-xs text-theme-subtle'>
												<span className='font-medium text-theme-subtle'>Implemented</span> - Thanks for the great suggestion, Adam!
											</span>
										</div>
									</div>
								</div>
							</div>
						</div>
					</section>

					{/* Upcoming Features */}
					<section className='bg-theme-secondary rounded-lg p-6'>
						<h2 className='text-2xl font-semibold text-theme-primary mb-4 flex items-center gap-2'>
							<svg className='w-6 h-6' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
								<path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M15 12a3 3 0 11-6 0 3 3 0 016 0z' />
								<path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z' />
							</svg>
							What&apos;s Coming Next
						</h2>
						<div className='grid gap-4 md:grid-cols-2'>
							<div className='bg-theme-card rounded-lg p-4 border border-theme-primary'>
								<h4 className='font-medium text-theme-primary mb-2'>
									Smart RSVP Forms
								</h4>
								<p className='text-sm text-theme-muted'>
									Pre-populated user information for faster
									RSVPs
								</p>
							</div>
							<div className='bg-theme-card rounded-lg p-4 border border-theme-primary'>
								<h4 className='font-medium text-theme-primary mb-2'>
									Enhanced Notifications
								</h4>
								<p className='text-sm text-theme-muted'>
									Better event reminders and updates
								</p>
							</div>
							<div className='bg-theme-card rounded-lg p-4 border border-theme-primary'>
								<h4 className='font-medium text-theme-primary mb-2'>
									Pot Luck Feature
								</h4>
								<p className='text-sm text-theme-muted'>
									Sign-up system for pot luck dinners to
									coordinate dishes and avoid duplicate items
								</p>
							</div>
							<div className='bg-theme-card rounded-lg p-4 border border-theme-primary'>
								<h4 className='font-medium text-theme-primary mb-2'>
									Recipe Sharing
								</h4>
								<p className='text-sm text-theme-muted'>
									Share your favorite recipes with the
									community
								</p>
							</div>
						</div>
					</section>

					{/* Feedback Section */}
					<section className='bg-theme-secondary rounded-lg p-6'>
						<h2 className='text-2xl font-semibold text-theme-primary mb-4 flex items-center gap-2'>
							<svg className='w-6 h-6' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
								<path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z' />
							</svg>
							Share Your Ideas
						</h2>
						<p className='text-theme-muted mb-4'>
							Have a suggestion or found a bug? We&apos;d love to
							hear from you! Your feedback helps make Family
							Dinner Planning better for everyone.
						</p>
						<div className='flex flex-col sm:flex-row gap-3'>
							<a
								href='mailto:buford@familydinner.me'
								className='inline-flex items-center justify-center px-4 py-2 btn-primary font-medium rounded-lg transition-colors'
							>
								Send Feedback
							</a>
							<a
								href='https://github.com/bufordeeds/family-dinner/issues'
								className='inline-flex items-center justify-center px-4 py-2 btn-secondary font-medium rounded-lg transition-colors'
							>
								Report a Bug
							</a>
						</div>
					</section>

					{/* Support Section */}
					<section className='bg-theme-secondary rounded-lg p-6'>
						<h2 className='text-2xl font-semibold text-theme-primary mb-4 flex items-center gap-2'>
							<svg className='w-6 h-6' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
								<path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z' />
							</svg>
							Support the Project
						</h2>
						<p className='text-theme-muted mb-4'>
							Love using Family Dinner? If this app has helped you
							organize memorable meals with friends and family,
							consider supporting its development! Your support
							helps keep the lights on and enables new features.
						</p>
						<div className='flex flex-col sm:flex-row gap-3 items-center'>
							<a
								href='https://coff.ee/bufordeeds'
								target='_blank'
								rel='noopener noreferrer'
								className='inline-flex items-center justify-center px-4 py-2 btn-primary font-medium rounded-lg transition-colors'
							>
								Buy me a coffee
							</a>
							<span className='text-sm text-theme-muted'>
								Every coffee helps fuel more delicious features!
							</span>
						</div>
					</section>
				</div>
			</div>

			{/* Buy Me A Coffee Widget */}
			<Script
				src='https://cdnjs.buymeacoffee.com/1.0.0/widget.prod.min.js'
				data-name='BMC-Widget'
				data-cfasync='false'
				data-id='bufordeeds'
				data-description='Support me on Buy me a coffee!'
				data-message='Thanks for your support!'
				data-color='#5F7FFF'
				data-position='Right'
				data-x_margin='18'
				data-y_margin='18'
				strategy='lazyOnload'
			/>
		</div>
	);
}
