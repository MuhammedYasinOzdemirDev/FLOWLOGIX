import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { FlowArrowIcon } from '@phosphor-icons/react/dist/csr/FlowArrow'
import { PulseIcon } from '@phosphor-icons/react/dist/csr/Pulse'
import { SquaresFourIcon } from '@phosphor-icons/react/dist/csr/SquaresFour'
import { NavLink, Outlet } from 'react-router'

const navigationRailWidth = 272

export function AppShell() {
  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: {
          xs: 'minmax(0, 1fr)',
          md: `${navigationRailWidth}px minmax(0, 1fr)`,
        },
        minHeight: '100dvh',
        bgcolor: 'background.default',
      }}
    >
      <Box
        component="aside"
        sx={{
          display: {
            xs: 'none',
            md: 'flex',
          },
          position: 'sticky',
          top: 0,
          isolation: 'isolate',
          height: '100dvh',
          overflow: 'hidden',
          flexDirection: 'column',
          color: 'grey.100',
          borderRight: '1px solid rgba(148, 163, 184, 0.14)',
          background:
            'radial-gradient(circle at 12% 8%, rgba(37, 99, 235, 0.26), transparent 28%), linear-gradient(180deg, #07111F 0%, #0B1739 54%, #0B2140 100%)',

          '&::before': {
            position: 'absolute',
            zIndex: -1,
            inset: 0,
            content: '""',
            opacity: 0.16,
            backgroundImage:
              'linear-gradient(rgba(148, 163, 184, 0.16) 1px, transparent 1px), linear-gradient(90deg, rgba(148, 163, 184, 0.16) 1px, transparent 1px)',
            backgroundSize: '32px 32px',
            maskImage: 'linear-gradient(to bottom, black, transparent 76%)',
          },
        }}
      >
        <Stack
          direction="row"
          spacing={1.5}
          sx={{
            alignItems: 'center',
            px: 2.5,
            py: 2.5,
            borderBottom: '1px solid rgba(148, 163, 184, 0.14)',
          }}
        >
          <Box
            aria-hidden="true"
            sx={{
              display: 'grid',
              position: 'relative',
              width: 42,
              height: 42,
              overflow: 'hidden',
              flex: '0 0 auto',
              placeItems: 'center',
              border: '1px solid rgba(147, 197, 253, 0.38)',
              borderRadius: 2.5,
              color: 'common.white',
              background:
                'linear-gradient(145deg, rgba(96, 165, 250, 0.98), rgba(37, 99, 235, 0.92) 48%, rgba(15, 118, 110, 0.96))',
              boxShadow: '0 14px 30px rgba(37, 99, 235, 0.28)',

              '&::after': {
                position: 'absolute',
                inset: 1,
                content: '""',
                border: '1px solid rgba(255, 255, 255, 0.18)',
                borderRadius: '9px',
              },
            }}
          >
            <FlowArrowIcon size={24} weight="bold" />
          </Box>

          <Box sx={{ minWidth: 0 }}>
            <Typography
              component="p"
              sx={{
                color: 'common.white',
                fontSize: '1.05rem',
                fontWeight: 800,
                letterSpacing: '-0.02em',
                lineHeight: 1.15,
              }}
            >
              FlowLogix
            </Typography>

            <Typography variant="caption" sx={{ color: 'grey.400' }}>
              Operasyon Kontrol Kulesi
            </Typography>
          </Box>
        </Stack>

        <Box component="nav" aria-label="Ana navigasyon" sx={{ px: 1.5, py: 2.5 }}>
          <Typography
            variant="overline"
            sx={{
              display: 'block',
              px: 1.5,
              mb: 1,
              color: 'grey.500',
            }}
          >
            Çalışma alanı
          </Typography>

          <Box
            component={NavLink}
            to="/"
            end
            sx={{
              display: 'flex',
              position: 'relative',
              gap: 1.5,
              alignItems: 'center',
              px: 1.5,
              py: 1.35,
              overflow: 'hidden',
              border: '1px solid transparent',
              borderRadius: 2.5,
              color: 'grey.300',
              textDecoration: 'none',
              fontWeight: 650,
              transition:
                'transform 160ms ease, background-color 160ms ease, border-color 160ms ease, color 160ms ease',

              '&::before': {
                position: 'absolute',
                top: '22%',
                bottom: '22%',
                left: 0,
                width: 3,
                content: '""',
                borderRadius: '0 999px 999px 0',
                bgcolor: 'primary.light',
                opacity: 0,
                transform: 'scaleY(0.55)',
                transition: 'opacity 160ms ease, transform 160ms ease',
              },

              '&:hover': {
                transform: 'translateX(2px)',
                borderColor: 'rgba(147, 197, 253, 0.16)',
                bgcolor: 'rgba(255, 255, 255, 0.06)',
                color: 'common.white',
              },

              '&.active': {
                borderColor: 'rgba(147, 197, 253, 0.22)',
                bgcolor: 'rgba(37, 99, 235, 0.22)',
                color: 'common.white',
                boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.04)',

                '&::before': {
                  opacity: 1,
                  transform: 'scaleY(1)',
                },
              },

              '&:focus-visible': {
                outline: '2px solid',
                outlineColor: 'primary.light',
                outlineOffset: 2,
              },

              '@media (prefers-reduced-motion: reduce)': {
                transition: 'none',

                '&::before': {
                  transition: 'none',
                },

                '&:hover': {
                  transform: 'none',
                },
              },
            }}
          >
            <Box
              aria-hidden="true"
              sx={{
                display: 'grid',
                width: 32,
                height: 32,
                flex: '0 0 auto',
                placeItems: 'center',
                borderRadius: 2,
                bgcolor: 'rgba(255, 255, 255, 0.07)',
              }}
            >
              <SquaresFourIcon size={19} weight="duotone" />
            </Box>

            <Box sx={{ minWidth: 0, flex: 1 }}>
              <Typography component="span" sx={{ display: 'block', fontWeight: 650 }}>
                Genel bakış
              </Typography>
              <Typography
                component="span"
                variant="caption"
                sx={{ display: 'block', color: 'grey.500' }}
              >
                Operasyonun ana görünümü
              </Typography>
            </Box>

            <Typography
              component="span"
              variant="caption"
              sx={{ color: 'grey.500', fontVariantNumeric: 'tabular-nums' }}
            >
              01
            </Typography>
          </Box>
        </Box>

        <Box sx={{ mt: 'auto', p: 2 }}>
          <Box
            sx={{
              p: 2,
              border: '1px solid rgba(148, 163, 184, 0.14)',
              borderRadius: 2.5,
              bgcolor: 'rgba(255, 255, 255, 0.045)',
              backdropFilter: 'blur(12px)',
            }}
          >
            <Stack direction="row" spacing={1} sx={{ alignItems: 'center', mb: 1.25 }}>
              <PulseIcon aria-hidden="true" size={17} weight="duotone" />
              <Typography variant="caption" sx={{ color: 'grey.300', fontWeight: 700 }}>
                MVP çalışma profili
              </Typography>
            </Stack>

            <Typography variant="body2" sx={{ color: 'grey.400' }}>
              Yurtiçi · Komple taşıma
            </Typography>
            <Typography variant="body2" sx={{ mt: 0.25, color: 'grey.400' }}>
              Özmal filo · TRY
            </Typography>

            <Chip
              label="Europe/Istanbul"
              size="small"
              sx={{
                mt: 1.5,
                height: 24,
                border: '1px solid rgba(147, 197, 253, 0.16)',
                bgcolor: 'rgba(37, 99, 235, 0.14)',
                color: 'grey.200',
                fontSize: '0.7rem',
              }}
            />
          </Box>
        </Box>
      </Box>

      <Box sx={{ minWidth: 0 }}>
        <Box
          component="header"
          sx={{
            display: 'flex',
            position: 'sticky',
            zIndex: 10,
            top: 0,
            minHeight: 68,
            px: {
              xs: 2,
              sm: 3,
              lg: 4,
            },
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 2,
            borderBottom: '1px solid',
            borderColor: 'rgba(203, 213, 225, 0.72)',
            bgcolor: 'rgba(255, 255, 255, 0.84)',
            boxShadow: '0 8px 30px rgba(15, 23, 42, 0.035)',
            backdropFilter: 'blur(18px) saturate(150%)',
          }}
        >
          <Stack direction="row" spacing={1.25} sx={{ alignItems: 'center', minWidth: 0 }}>
            <Box
              aria-hidden="true"
              sx={{
                display: { xs: 'grid', md: 'none' },
                width: 34,
                height: 34,
                flex: '0 0 auto',
                placeItems: 'center',
                borderRadius: 2,
                color: 'common.white',
                background: 'linear-gradient(145deg, #60A5FA, #2563EB 58%, #0F766E)',
                boxShadow: '0 8px 18px rgba(37, 99, 235, 0.2)',
              }}
            >
              <FlowArrowIcon size={20} weight="bold" />
            </Box>

            <Box sx={{ minWidth: 0 }}>
              <Typography
                component="p"
                sx={{
                  overflow: 'hidden',
                  fontWeight: 750,
                  letterSpacing: '-0.015em',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}
              >
                <Box component="span" sx={{ display: { xs: 'inline', md: 'none' } }}>
                  FlowLogix
                </Box>
                <Box component="span" sx={{ display: { xs: 'none', md: 'inline' } }}>
                  Operasyon merkezi
                </Box>
              </Typography>
              <Typography
                variant="caption"
                sx={{
                  display: { xs: 'none', sm: 'block' },
                  color: 'text.secondary',
                }}
              >
                Günlük karar ve takip alanı
              </Typography>
            </Box>
          </Stack>

          <Chip
            label="Tek şirket · Tek şube"
            variant="outlined"
            size="small"
            sx={{
              flex: '0 0 auto',
              borderColor: 'divider',
              bgcolor: 'rgba(248, 250, 252, 0.78)',
              color: 'text.secondary',
            }}
          />
        </Box>

        <Box
          component="main"
          sx={{
            position: 'relative',
            isolation: 'isolate',
            minHeight: 'calc(100dvh - 68px)',
            overflow: 'hidden',
            px: {
              xs: 2,
              sm: 3,
              lg: 4,
            },
            py: {
              xs: 3,
              sm: 4,
              lg: 5,
            },

            '&::before': {
              position: 'absolute',
              zIndex: -1,
              top: -180,
              right: -160,
              width: 520,
              height: 520,
              content: '""',
              borderRadius: '50%',
              background:
                'radial-gradient(circle, rgba(37, 99, 235, 0.1), rgba(15, 118, 110, 0.04) 48%, transparent 70%)',
              pointerEvents: 'none',
            },
          }}
        >
          <Box sx={{ width: '100%', maxWidth: 1440, mx: 'auto' }}>
            <Outlet />
          </Box>
        </Box>
      </Box>
    </Box>
  )
}
