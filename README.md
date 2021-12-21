# Pickup Tabs  [![Netlify Status](https://api.netlify.com/api/v1/badges/a3a30752-2633-4e30-893b-f12652645a17/deploy-status)](https://app.netlify.com/sites/pickuptabs/deploys)
<!-- update the netlify badge above with your own badge that you can find at netlify under settings/general#status-badges -->

![Home](https://user-images.githubusercontent.com/83558122/146853729-8b3181c9-a867-44a0-b0db-85daba1c3f64.PNG)
Do you want to play the guitar but struggle reading sheet music? Are you slowly losing motivation? Keep track of your progress, and learn your favorite songs with Pickup Tabs!

[View App](https://pickuptabs.netlify.app/)

## Get Started <!-- OPTIONAL, but doesn't hurt -->
```
$ git clone git@github.com:albertchitta/Pickup-Tabs.git
$ cd Pickup-Tabs
```
## About the User <!-- This is a scaled down user persona -->
- Beginner guitarists can use this website to track the learning progress of their favorite songs.
- The user will be able to search for artists or songs that they can add to their tracker.

## Features <!-- List your app features using bullets! Do NOT use a paragraph. No one will read that! -->
- Authentication - Users can login and logout of the application using Google.
- Users can search for artists or songs. Users will have to login to create progress trackers.
- Users will have a progress bar that they can use to mark each milestone (intro, riffs, verses, choruses, solos, outros).
- Users can sort the trackers between Learning, Completed, and Planning.
- React and Reactstrap for Modals.
- Styled Components.
- Responsive and mobile-friendly.

## Video Walkthrough of Pickup Tabs <!-- A loom link is sufficient -->
https://www.loom.com/share/794701c36b5a4d8b8563b448bbfcf041

## Relevant Links <!-- Link to all the things that are required outside of the ones that have their own section -->
- [Check out the deployed site](https://pickuptabs.netlify.app/)
- [Wireframes](https://docs.google.com/presentation/d/1q_uiTUlDztvt_vHUVExLs2Lv8HXXmN3VFiuodu7GdL4/edit?usp=sharing)
- [ERD](https://dbdiagram.io/d/61a571178c901501c0d8509f)
- [Project Board](https://github.com/albertchitta/Pickup-Tabs/projects/1)
- [Songsterr API](https://www.songsterr.com/a/wa/api)

## Code Snippet <!-- OPTIONAL, but doesn't hurt -->
This code block shows the progress tracker and how each milestone is configured to be completed or reset.
```
<Box sx={{ width: '100%' }}>
  <Stepper nonLinear activeStep={activeStep}>
    {steps.map((label, index) => (
      <Step key={label} completed={completed[index]}>
        <StepButton color="inherit" onClick={handleStep(index)}>
          {label}
        </StepButton>
      </Step>
    ))}
  </Stepper>
  <div>
    {allStepsCompleted() ? (
      <>
        <Typography sx={{ mt: 2, mb: 1 }}>
          All steps completed - you&apos;re finished
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
          <Box sx={{ flex: '1 1 auto' }} />
          <Button onClick={handleReset}>Reset</Button>
        </Box>
      </>
    ) : (
      <>
        <Typography sx={{ mt: 2, mb: 1 }}>
          Step {activeStep + 1}: {steps[activeStep]}
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
          <Button
            color="inherit"
            disabled={activeStep === 0}
            onClick={handleBack}
            sx={{ mr: 1 }}
            className="btn-back"
          >
            Back
          </Button>
          <Button
            onClick={handleNext}
            sx={{ mr: 1 }}
            className="btn-next"
          >
            Next
          </Button>
          <Box sx={{ flex: '1 1 auto' }} />
          {activeStep !== steps.length
            && (completed[activeStep] ? (
              <Button className="reset-button" onClick={resetStep}>
                Reset {steps[activeStep]}
              </Button>
            ) : (
              <Button
                className="complete-button"
                onClick={handleComplete}
              >
                {completedSteps() === totalSteps() - 1
                  ? 'Finish'
                  : `Complete ${steps[activeStep]}`}
              </Button>
            ))}
        </Box>
      </>
    )}
  </div>
</Box>
```

## Project Screenshots <!-- These can be inside of your project. Look at the repos from class and see how the images are included in the readme -->
![Home Search](https://user-images.githubusercontent.com/83558122/146853733-5bcffdb9-78e9-4d7d-a760-159a3febf444.PNG)
![Currently Learning](https://user-images.githubusercontent.com/83558122/146853735-0debbc91-ebab-410d-b26a-2a0dad8bc1a8.PNG)
![Completed](https://user-images.githubusercontent.com/83558122/146853739-f54cc992-6dc4-40e8-8c20-87222cdd329d.PNG)
![Planning to Learn](https://user-images.githubusercontent.com/83558122/146853741-151725ca-93d3-4415-9f9e-49d5540c1fba.PNG)

## Contributors
- [Albert Chittaphong](https://github.com/albertchitta)
